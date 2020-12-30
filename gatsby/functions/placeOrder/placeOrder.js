const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Your order will be ready in a15 minutes</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}" />
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join("")}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pick-up</p>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // check if the honeypot field is filled-out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Fuck off 🤖",
      }),
    };
  }

  // validate the data coming in is correct
  const requiredFields = ["email", "name", "order"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Oh no you are missing the ${field}` }),
      };
    }
  }

  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Sorry, you need to add something to order first 👀`,
      }),
    };
  }

  // send email
  await transporter.sendMail({
    from: "slick slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order!!!",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success! We got your order and its being prepared now :)",
    }),
  };
};
