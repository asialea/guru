from django.conf import settings
from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import AbstractUser


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
    location = models.CharField(max_length=30, blank=True,null=False,default="")
    bio = models.TextField(max_length=500, blank=True,null = False,default="")
    github = models.CharField(max_length=200,blank=True,null = False,default="")
    linkedin = models.CharField(max_length=100,blank=True,null = False,default="")
    twitter_handle = models.CharField(max_length=100,blank=True,null = False,default="")

class Avi(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,unique = True)
    avi_path = models.CharField(max_length=150,blank=True,null = False,default="")


#Mentee
class Mentee(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, null = False)

#Mentor
class Mentor(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    mentees = models.ManyToManyField(Mentee)


class Connection(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False, related_name='userid_user')
    # second party id
    sec_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False, related_name='secid_user')
    status = models.CharField(max_length = 6)  # sent_request, accepted, request_pending
    time_status = models.DateTimeField()


class Review(models.Model):
    author_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False, related_name='author_user')
    about_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False, related_name='about_user')
    rating = IntegerRangeField(min_value=1, max_value=5)
    create_time = models.DateTimeField()
    review_text = models.TextField(max_length=300, blank=True)


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

#posts
class Post(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    create_time = models.DateTimeField()

class PostLike(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE,null = False)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)

class PostComment(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE,null = False)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    text = models.TextField(max_length=500, blank=True)

class CommentLike(models.Model):
    comment = models.ForeignKey(PostComment,on_delete=models.CASCADE,null = False)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
