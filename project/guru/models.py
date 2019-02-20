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
        unique_together = (('type', 'email'),)

    MENTOR = 'MR'
    MENTEE = 'ME'

    ACCOUNT_TYPE_CHOICES = (
    (MENTOR, 'Mentor'),
    (MENTEE, 'Mentee'),)

    type = models.CharField(max_length=2,choices=ACCOUNT_TYPE_CHOICES,default = MENTEE,)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avi_path = models.CharField(max_length=500,null = True)
    bio = models.TextField(max_length=500, blank=True)
    github = models.CharField(max_length=200,blank=True,null = True)
    linkedin = models.CharField(max_length=100,null = True)
    twitter_handle = models.CharField(max_length=15,null = True)

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
    description = models.TextField(max_length=300, blank=True)

#education
class Education(models.Model):
    FRESHMAN = 'FR'
    SOPHOMORE = 'SO'
    JUNIOR    = 'JR'
    SENIOR = 'SR'
    OTHER = 'NA'

    HIGHSCHOOL = 'HS'
    UNDERGRADUTE = 'UG'
    GRADUATE = 'GD'

    YEAR_CHOICES = (
    (FRESHMAN, 'Freshman'),
    (SOPHOMORE, 'SOPHOMORE'),
    (JUNIOR, 'Junior'),
    (SENIOR, 'Senior'),
    (OTHER,'N/A')
    )

    LEVEL_CHOICES = (
    (HIGHSCHOOL, 'High School'),
    (UNDERGRADUTE, 'Undergraduate'),
    (GRADUATE, 'Graduate School'),
    (OTHER, 'N/A'),
    )

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    start = models.DateField()
    end = models.DateField(blank=True, null = True)
    school = models.TextField(max_length=50, blank=False, null = False)
    level = models.CharField(max_length=2,choices=LEVEL_CHOICES,default = HIGHSCHOOL,)
    year = models.CharField(max_length=2,choices=YEAR_CHOICES,default = FRESHMAN,)

#interests enum
class Interest(models.Model):
    name = models.CharField(max_length=20, unique = True)

class UserInterests(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    interest = models.ForeignKey(Interest,on_delete=models.CASCADE,null = False)

# skills enum
class Skill(models.Model):
    name = models.CharField(max_length=20, unique = True)

#skills
class UserSkills(models.Model):
    BEGINNER = 'BR'
    INTERMEDIATE = 'IE'
    ADVANCED = 'AD'

    PROFICIENCY_CHOICES = (
    (BEGINNER, 'Beginner'),
    (INTERMEDIATE, 'Intermediate'),
    (ADVANCED, 'Advanced'),
    )

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null = False)
    skill = models.ForeignKey(Skill,on_delete=models.CASCADE,null = False)
    level = models.CharField(max_length=2,choices=PROFICIENCY_CHOICES,default = BEGINNER,)

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
