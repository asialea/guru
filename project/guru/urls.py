
from . import views
from django.conf.urls import url

app_name = 'guru'
urlpatterns = [
    url('^api/users/$', views.UserViewSet.as_view() ),
    url('^auth/register/$', views.RegistrationView.as_view()),
    url('^auth/login/$', views.LoginView.as_view()),
    url("^auth/user/$", views.UserView.as_view()),


]
