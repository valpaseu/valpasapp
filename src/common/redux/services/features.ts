const spaceId = process.env.CONTENTFUL_APP_SPACE_ID
const accessToken = process.env.CONTENTFUL_APP_ACCESS_TOKEN

export default {
  loadData: (query: string) => {
    return fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        return response
      })
  },
}
