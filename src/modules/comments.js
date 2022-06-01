export default class commentsUrl {
  static commentsUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/X3LACiofRMQXf8LGL8qW/comments/';

  static getComments = async (id) => {
    const response = await fetch(`${this.commentsUrl} ? item_id = ${id}`);
    const data = await response.json();
    return data;
  };

  static setComments = async (id, userName, comment) => {
    const response = await fetch(this.commentsUrl, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        userName,
        comment,
      }),
      header: {
        'Content-type': 'application/JSON',
      },
    });

    const data = await response.text();
    return data;
  }
}
