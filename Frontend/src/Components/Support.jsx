export default function Support() {

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
