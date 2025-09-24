import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
import razorpay from 'razorpay'

//global variables

const currency = 'inr'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
})


//placing orders using COD delivery

const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()

        }
              const newOrder = new orderModel(orderData)
              await newOrder.save()

              await userModel.findByIdAndUpdate(userId,{cartData:{}})

              res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//placing orders using stripe methhod

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name, // ✅ corrected (was item_name)
        },
        unit_amount: item.price * 100, // ✅ corrected (was amount instead of unit_amount)
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges', // ✅ spelling corrected
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // ✅ removed extra spaces
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`, // ✅ fixed (was cancel_url_url)
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url }); // ✅ corrected (was success_url: success_url)
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const verifyStripe =  async(req,res)=>{
  const {orderId,success,userId}=req.body
  try {
    if(success==='true'){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
        console.log(error);
    res.json({ success: false, message: error.message });
  }
}



//placing orders using razorpay method

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Save order in DB
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Razorpay', // ✅ corrected
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Razorpay order options
    const options = {
      amount: amount * 100,           // amount in paise
      currency: 'INR',                // ✅ hardcoded INR
      receipt: newOrder._id.toString()
    };

    // Create Razorpay order
    const order = await razorpayInstance.orders.create(options);

    // Send order details to frontend
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



//verify razorpay

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);


    //     if (orderInfo.status === 'paid') {
    //   // remove "receipt_" prefix if it exists
    //   const orderId = orderInfo.receipt.replace('receipt_', '');

    //   await orderModel.findByIdAndUpdate(orderId, { payment: true });
    //   await userModel.findByIdAndUpdate(userId, { cartData: {} });

    //   res.json({ success: true, message: 'Payment Successful' });
    // }



    if (orderInfo.status === 'paid') {
   
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: 'Payment Successful' });
    } else {
      res.json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};







//all orders data for admin panel
const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



//User order data for frontend
const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



//update order status for admin panel
const updateStatus = async(req,res)=>{
    try {
        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
              console.log(error)
        res.json({success:false,message:error.message})
    }
}




export {placeOrder,placeOrderStripe,verifyStripe,placeOrderRazorpay,verifyRazorpay,allOrders,userOrders,updateStatus}
