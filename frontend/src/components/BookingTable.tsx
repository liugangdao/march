interface BookingTableProps {
  bookings: Booking[];
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr>
          <th>Theme</th>
          <th>Date</th>
          <th>Time</th>
          <th>Max</th>
          <th>Booked</th>
          <th>Remaining</th>
          <th>User Name</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.slot_id}>
            <td>{b.theme_title}</td>
            <td>{b.date}</td>
            <td>{b.time}</td>
            <td>{b.max_people}</td>
            <td>{b.booked_people}</td>
            <td>{b.remaining}</td>
            <td>{b.user_name}</td>
            <td>{b.user_email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
