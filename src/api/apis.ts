export const getData = async () => {
  try {
    console.log(`${process.env.API_URL}page=1&${process.env.API_KEY}`);
    const res = await fetch(`${process.env.API_URL}page=1&${process.env.API_KEY}`);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await res.json();

    return { data: json.response.docs };
  } catch (e) {
    console.log(e);
  }
};
