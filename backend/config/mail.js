import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
//helper
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const feedBackMail = async (req, res) => {
  try {
    const { from: userEmail, message } = req.body;
    if (!message) {
      return res.status(404).json({ message: "please send email data" });
    }

    await transporter.sendMail({
      from: userEmail,
      to: process.env.EMAIL,
      subject: "Get-Ur-Stay Footer Subscription",
      html: `
        <div style="font-family:sans-serif;">
          <h3>New Subscription from ${userEmail}</h3>
          <p>${message}</p>
          <hr/>
          <small>This message was sent via Get-Ur-Stay Footer Form</small>
        </div>
      `,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "failed to send mail", error: error.message });
  }
};


export const bookedRoomMail = async (req, res) => {
    try {
      const { from: userEmail, roomDetails } = req.body;
      if (!roomDetails) {
        return res.status(404).json({ message: "please send email data" });
      }

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Get-Ur-Stay Room Booking Confirmation",
        html: `
          <div style="font-family:sans-serif;">
            <h3>Room Booking Confirmation for ${userEmail}</h3>
            <p>Room Details: ${roomDetails}</p>
            <hr/>
            <small>This message was sent via Get-Ur-Stay Room Booking</small>
          </div>
        `,
      });

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "failed to send mail", error: error.message });
    }
};