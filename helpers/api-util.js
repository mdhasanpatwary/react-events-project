export async function getAllEvents() {
  const res = await fetch(
    "https://nextjs-course-3dca6-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const transformedEvents = [];
  for (const key in data) {
    transformedEvents.push({
      id: key,
      // title: data[key].title,
      // description: data[key].description,
      // location: data[key].location,
      // date: data[key].date,
      // image: data[key].image,
      // isFeatured: data[key].isFeatured,
      ...data[key],
    });
  }
  return transformedEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
