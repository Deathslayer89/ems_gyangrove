const supabase = require('./supabase');

module.exports = () => {
  supabase.from('events').select('*', { head: true }).then(({ error, count }) => {
    if (error) {
      console.error('Error creating events table:', error);
    } else if (count === 0) {
      supabase
        .from('events')
        .insert([])
        .then(({ error }) => {
          if (error) {
            console.error('Error creating events table:', error);
          } else {
            console.log('Events table created successfully');
          }
        });
    } else {
      console.log('Events table already exists');
    }
  });
};