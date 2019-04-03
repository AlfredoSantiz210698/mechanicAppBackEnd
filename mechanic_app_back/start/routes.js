'use strict'


const Route = use('Route')


Route.group(() => {

  Route.get('/', () => {
    return "hola"
  })


  Route.post('/signup', 'UserController.signup')
  Route.post('/login', 'UserController.login')

  Route.get('/services', 'ServiceController.getServices')
  Route.get('/workshops', 'WorkshopController.getWorkshops')
  Route.get('/workshop/services', 'WorkshopController.getWorkshopsServices')



  Route.get('/admin/account', 'UserController.getProfile').middleware(['auth:jwt'])
  Route.post('/admin/account/update', 'UserController.updateProfile').middleware(['auth:jwt'])

  Route.get('/admin/workshop', 'WorkshopController.getWorkshopByMechanic').middleware(['auth:jwt'])
  Route.post('/admin/workshop', 'WorkshopController.createWorkshop').middleware(['auth:jwt'])

  Route.get('/admin/services', 'ServiceController.getServicesByWorkshop').middleware(['auth:jwt'])
  Route.post('/admin/services', 'ServiceController.createService').middleware(['auth:jwt'])
  Route.post('/admin/service-accepted', 'NotificationController.acceptServiceRequest').middleware(['auth:jwt'])
  Route.post('/admin/service-rejected', 'NotificationController.rejectedServiceRequest').middleware(['auth:jwt'])

  Route.get('/admin/notifications', 'NotificationController.getNotificationsAdmin').middleware(['auth:jwt'])
  Route.post('/admin/notifications/seen', 'NotificationController.requestSeen').middleware(['auth:jwt'])
  Route.post('/admin/set-position', 'GeolocationController.setPosition').middleware(['auth:jwt'])

  Route.get('/user/notifications', 'NotificationController.getNotificationsUser').middleware(['auth:jwt'])
  Route.post('/user/services-request', 'NotificationController.requestService').middleware(['auth:jwt'])
  Route.get('/user/get-position', 'GeolocationController.getPosition').middleware(['auth:jwt'])

  Route.post('/picture-create', 'PictureController.createPicture').middleware(['auth:jwt'])





}).prefix('/api/v1')
/*
/api/v1/signup  registro de usuario 
/api/v1/login    login de usuario

/api/v1/workshops  obtiene todos los talleres (NO ADMIN)
/api/v1/workshop/services  obtiene los servicios de un taller (NO ADMIN)
/api/v1/services  obtiene todos los servicios de todos los talleres(NO ADMIN)

/api/v1/admin/account pefil del  usuario
/api/v1/admin/account/update     actuzaliar pefl de usuario

/api/v1/admin/workshop  obtiene el taller del usuario (GET)
/api/v1/admin/workshop  crea el taller del usuario (POST)

/api/v1/admin/service  obtiene todos los servicios del mecanico(GET)
/api/v1/admin/service  crea servicios para el taller(POST)



/api/v1/admin/service-accepted  es para aceptar el servicio en las notificaciones(POST)c
/api/v1/admin/notifications  otiene todas las notificaciones(GET)
/api/v1/admin/notifications/seen  deja en visto una solicitud(GET)



/api/v1/user/services-request  el usuario pide un servicio (POST)












*/




