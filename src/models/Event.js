const supabase = require("../config/supabase");

class Event {
  static async createEvents(events) {
    const { error } = await supabase.from("events").insert(events);
    if (error) {
      return { error: error };
    }
    return { success: "successfully Events Created" };
  }

  static async findEvents(latitude, longitude, date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", startDate.toISOString().split("T")[0])
      .lte("event_date", endDate.toISOString().split("T")[0])
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Error finding events:", error);
      return [];
    }

    return data;
  }
}

module.exports = Event;
