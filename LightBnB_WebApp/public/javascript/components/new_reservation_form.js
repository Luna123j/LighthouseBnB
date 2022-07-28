$(() => {

  const $newReservationForm = $(`
  <form action="/api/reservations" method="post" id="new-reservation-form" class="new-reservation-form">
      <div class="new-reservation-form__field-wrapper">
        <label for="new-reservation-form__title">Start Date</label>
        <input type="date" name="start_date" placeholder="YY/MM/DD" id="new-reservation-form__start">
      </div>
      
      <div class="new-reservation-form__field-wrapper">
      <label for="new-reservation-form__title">End Date</label>
      <input type="date" name="end_date" placeholder="YY/MM/DD" id="new-reservation-form__end">
      </div>

        <div class="new-reservation-form__field-wrapper">
            <button type = 'submit'>Create</button>
            <a id="reservation-form__cancel" href="#">Cancel</a>
        </div>
        
  </form>
  `);

  window.$newReservationForm = $newReservationForm;

  $newReservationForm.on('submit', function(event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    // console.log(data);
    submitReservation(data)
      .then(() => {
        console.log('here')
        views_manager.show('listings');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('listings');
      })
  });

  $('body').on('click', '#reservation-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });

});