
from . import views
from django.conf.urls import url,re_path
from rest_framework import routers
from django.urls import include

app_name = 'guru'
urlpatterns = [
    url('^api/users/$', views.UserViewSet.as_view() ),
    url('^auth/register/$', views.RegistrationView.as_view()),
    url('^auth/login/$', views.LoginView.as_view()),
    url('^auth/user/$', views.UserView.as_view()),
    url('^auth/user/update/$',views.UpdateUserView.as_view()),
    url('^auth/logout/$', views.LogoutView.as_view()),
    url('^api/user/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ProfileView.as_view()),
    url('^api/work/$',views.WorkView.as_view()),
    url('^api/work/(?P<id>\d+)', views.WorkView.as_view()),
    url('^api/education/$',views.EducationView.as_view()),
    url('^api/education/(?P<id>\d+)', views.EducationView.as_view()),
    url('^api/aboutUser/$', views.AboutUserView.as_view()),
    url('^api/skills/$',views.UserSkillsView.as_view()),
    url('^api/skills/(?P<id>\d+)', views.UserSkillsView.as_view()),
    url('^api/interests/$',views.UserInterestsView.as_view()),
    url('^api/interests/(?P<id>\d+)', views.UserInterestsView.as_view()),
]
