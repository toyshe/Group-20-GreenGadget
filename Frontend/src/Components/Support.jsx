import { useEffect } from "react";

export default function Support() {

  let i = 0;
  let y = 0;
  let j = 0;
  let placeholder = "";
  const txt = "example@domain.com";
  let nameplaceholder = "";
  const nametxt = "Enter your preferred name";
  let messageplaceholder = "";
  const messagetxt = "Enter your preferred name";

  // useEffect(
  //   function type()  {
  //     placeholder += txt.charAt(i);
  //     console.log(txt.charAt(i))
  //     document.getElementById("email").setAttribute("placeholder",placeholder);
  //     i++;
  //     setTimeout(type,200);
  // })


  // useEffect(function nametype()  {
  //     nameplaceholder += nametxt.charAt(y);
  //     document.getElementById("name").setAttribute("placeholder",nameplaceholder);
  //     y++;
  //     setTimeout(nametype,120);
  // },[])

  // useEffect(function messagetype()  {
  //   messageplaceholder += messagetxt.charAt(j);
  //   document.getElementById("message").setAttribute("placeholder",messageplaceholder);
  //   j++;
  //   setTimeout(messagetype,120);
  // },[])

  return (
    <div className="support-container">
      <h1>Support</h1>
      <p>
        If you're experiencing any issues with your laptop, our support team is here to help you.
        Please fill out the form below, and we'll get back to you as soon as possible.
      </p>
      <form className="support-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name"  required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"  required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required placeholder="Messagebox"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
