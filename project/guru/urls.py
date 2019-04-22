
from . import views
from django.conf.urls import url

app_name = 'guru'
urlpatterns = [
    url('^api/users/$', views.UserViewSet.as_view() ),
    url('^auth/register/$', views.RegistrationView.as_view()),
    url('^auth/login/$', views.LoginView.as_view()),
    url('^auth/user/$', views.UserView.as_view()),
    url('^api/user/(?P<id>[0-9]+)/$',views.ProfileView.as_view()),
    url('^auth/logout/$', views.LogoutView.as_view()),
    url('^auth/user/update/$',views.UpdateUserView.as_view()),
]
