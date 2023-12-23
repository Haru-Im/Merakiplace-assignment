export const getData = async ({
  pageParam = 0,
  query = '',
  filter = '',
}: {
  pageParam: number;
  query: string;
  filter: string;
}) => {
  try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=${filter}&print_page=${pageParam}&api-key=${process.env.EXPO_PUBLIC_API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await res.json();

    return { data: json.response.docs, nextPage: pageParam + 1 };
  } catch (e) {
    console.log(e);
  }
};
