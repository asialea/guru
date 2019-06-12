from django.conf import settings
from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import AbstractUser
import django.utils

class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)

class User(AbstractUser):
    class Meta:
        unique_together = (('username', 'type'),)

    MENTOR = 'MR'
    MENTEE = 'ME'

    ACCOUNT_TYPE_CHOICES = (
    (MENTOR, 'Mentor'),
    (MENTEE, 'Mentee'),)

    type = models.CharField(max_length=2,choices=ACCOUNT_TYPE_CHOICES,default = MENTEE,)



class AboutUser(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False,unique = True)
    location = models.CharField(max_length=30, blank=True,null=True,default="")
    bio = models.TextField(max_length=500, blank=True,null = True,default="")
    github = models.CharField(max_length=200,blank=True,null = True,default="")
    linkedin = models.CharField(max_length=100,blank=True,null = True,default="")
    twitter_handle = models.CharField(max_length=100,blank=True,null = True,default="")

class Avi(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,unique = True)
    avi_path = models.CharField(max_length=150,blank=True,null = False,default="")

#work experience
class Work(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    start = models.DateField()
    end = models.DateField(blank=True, null = True)
    company = models.TextField(max_length=50, blank=False, null = False)
    location = models.CharField(max_length=30, blank=True)
    position = models.TextField(max_length=50, blank=False, null = False)
    description = models.CharField(max_length=300, blank=True)

#education
class Education(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    start = models.DateField()
    end = models.DateField(blank=True, null = True)
    location = models.CharField(max_length=50, blank=True,null = True)
    school = models.TextField(max_length=50, blank=False, null = False)
    degree = models.TextField(max_length=50, blank=True, null = True)

class UserInterests(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    interest = models.TextField(max_length=50, blank=False, null = False)

#skills
class UserSkills(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    skill = models.TextField(max_length=50, blank=False, null = False)

# FORUM

class Category(models.Model):
    name = models.CharField(max_length=50, blank=True,null = True)

class Topic(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE,null = True)
    name = models.CharField(max_length=50, blank=True,null = True)
    created_by = models.IntegerField()

class Post(models.Model):
    topic = models.ForeignKey(Topic,on_delete=models.CASCADE,null = True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,null = False,default=1)
    timestamp = models.DateTimeField(auto_now=True)
    text = models.TextField(max_length=500, blank=False,null = False,default="")
    reply_to = models.ForeignKey('self',on_delete=models.SET_NULL,null=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = True)

class Likes(models.Model):
    class Meta:
        unique_together = (('post', 'user_id'),)
    post = models.ForeignKey(Post,on_delete=models.CASCADE,null = True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = True)
