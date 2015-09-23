export default {
  create({ name, parentID }) {
    return window.Requester.request({
      url: ApiRoutes.operatorCategories(),
      method: 'POST',
      data: {
        name,
        parent_id: parentID,
      }
    });
  }
}