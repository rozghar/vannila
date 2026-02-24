export function StudentProfile() {
  return (
    <div className="role-profile">
      <h3>Student Details</h3>
      <div className="profile-field">
        <label>School/College Name</label>
        <input type="text" placeholder="Enter school or college name" />
      </div>
      <div className="profile-field">
        <label>Current Grade/Year</label>
        <select>
          <option>Class 1</option>
          <option>Class 12</option>
          <option>BA/BSc Year 1</option>
          <option>BA/BSc Year 2</option>
          <option>BA/BSc Year 3</option>
        </select>
      </div>
      <div className="profile-field">
        <label>Subjects of Interest</label>
        <input type="text" placeholder="e.g., Mathematics, English, Science" />
      </div>
    </div>
  )
}

export function TeacherProfile() {
  return (
    <div className="role-profile">
      <h3>Teacher/Tutor Details</h3>
      <div className="profile-field">
        <label>Qualifications</label>
        <input type="text" placeholder="e.g., B.A., M.A., B.Ed" />
      </div>
      <div className="profile-field">
        <label>Subjects Taught</label>
        <input type="text" placeholder="e.g., Mathematics, Physics, Chemistry" />
      </div>
      <div className="profile-field">
        <label>Experience (Years)</label>
        <input type="number" placeholder="Years of teaching experience" />
      </div>
      <div className="profile-field">
        <label>Hourly Rate (₹)</label>
        <input type="number" placeholder="e.g., 500" />
      </div>
      <div className="profile-field">
        <label>Availability</label>
        <textarea placeholder="e.g., Monday-Friday 4PM-7PM, Saturday 10AM-1PM"></textarea>
      </div>
    </div>
  )
}

export function DriverProfile() {
  return (
    <div className="role-profile">
      <h3>Driver Details</h3>
      <div className="profile-field">
        <label>License Number</label>
        <input type="text" placeholder="Driving license number" />
      </div>
      <div className="profile-field">
        <label>License Expiry</label>
        <input type="date" />
      </div>
      <div className="profile-field">
        <label>Vehicle Type</label>
        <select>
          <option>Car</option>
          <option>Bike</option>
          <option>Auto Rickshaw</option>
          <option>Taxi</option>
          <option>Truck</option>
        </select>
      </div>
      <div className="profile-field">
        <label>Vehicle Registration Number</label>
        <input type="text" placeholder="e.g., WB01AB1234" />
      </div>
      <div className="profile-field">
        <label>Years of Experience</label>
        <input type="number" placeholder="Driving experience in years" />
      </div>
      <div className="profile-field">
        <label>Preferred Routes/Areas</label>
        <textarea placeholder="e.g., Kolkata to Howrah, Airport runs"></textarea>
      </div>
    </div>
  )
}

export function LocalsProfile() {
  return (
    <div className="role-profile">
      <h3>Local Service Provider Details</h3>
      <div className="profile-field">
        <label>Service Type</label>
        <select>
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Carpentry</option>
          <option>Cleaning</option>
          <option>Gardening</option>
          <option>Repair & Maintenance</option>
          <option>Other</option>
        </select>
      </div>
      <div className="profile-field">
        <label>Years of Experience</label>
        <input type="number" placeholder="Years in service" />
      </div>
      <div className="profile-field">
        <label>Service Rate</label>
        <input type="text" placeholder="e.g., ₹500/hour or fixed rates" />
      </div>
      <div className="profile-field">
        <label>Service Areas</label>
        <textarea placeholder="Areas or localities you serve"></textarea>
      </div>
    </div>
  )
}
