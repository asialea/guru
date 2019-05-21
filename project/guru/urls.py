
from . import views
from django.conf.urls import url,re_path
from rest_framework import routers
from django.urls import include

app_name = 'guru'
urlpatterns = [
    # Authentication
    url('^api/users/$', views.UserViewSet.as_view() ),
    url('^auth/register/$', views.RegistrationView.as_view()),
    url('^auth/login/$', views.LoginView.as_view()),
    url('^auth/user/$', views.UserView.as_view()),
    url('^auth/user/update/$',views.UpdateUserView.as_view()),
    url('^auth/logout/$', views.LogoutView.as_view()),
    # Edit user profile
    url('^api/work/$',views.WorkView.as_view()),
    url('^api/work/(?P<id>\d+)', views.WorkView.as_view()),
    url('^api/education/$',views.EducationView.as_view()),
    url('^api/education/(?P<id>\d+)', views.EducationView.as_view()),
    url('^api/aboutUser/$', views.AboutUserView.as_view()),
    url('^api/skills/$',views.UserSkillsView.as_view()),
    url('^api/skills/(?P<id>\d+)', views.UserSkillsView.as_view()),
    url('^api/interests/$',views.UserInterestsView.as_view()),
    url('^api/interests/(?P<id>\d+)', views.UserInterestsView.as_view()),
    # View user profile
    url('^api/user/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ReadUserView.as_view()),
    url('^api/aboutUser/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ReadAboutUserView.as_view()),
    url('^api/user-edu/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ReadEducationView.as_view()),
    url('^api/user-work/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ReadWorkView.as_view()),
    url('^api/user-skills/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ReadSkillsView.as_view()),
    url('^api/user-interests/(?P<username>[a-zA-Z0-9_.-s]+)/$',views.ReadInterestsView.as_view()),
    # Search     url('^api/search/(?P<param>[a-zA-Z0-9_.-s]+)/(?P<term>[a-zA-Z0-9_.-s]+)/$',views.SearchView.as_view()),


]
