
module.exports.routes = {

  '/': { view: 'pages/homepage' },
    'POST /tasks': 'TaskController.create',
    'GET /tasks': 'TaskController.find',
    'GET /tasks/:id': 'TaskController.findOne',
    'PUT /tasks/:id': 'TaskController.update',
    'DELETE /tasks/:id': 'TaskController.destroy'
 
  


};
