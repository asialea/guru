from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
import datetime


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name','password','type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],email=validated_data['email'],
        first_name = validated_data['first_name'],last_name=validated_data['last_name'],
        password = validated_data['password'],type=validated_data['type'],)
        return user

def update_attrs(instance, data):
    instance_pk = instance.pk
    for key, value in data.items():
        if hasattr(instance, key):
            setattr(instance, key, value)
        else:
            raise KeyError("Failed to update non existing attribute {}.{}".format(
                instance.__class__.__name__, key
            ))
        instance.save()
    return instance.__class__.objects.get(pk=instance_pk)


class AboutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUser
        fields = '__all__'

class AviSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avi
        fields = ('user_id','avi_path',)

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'


class UserSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkills
        fields = '__all__'


class UserInterestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInterests
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)

class FilterSerializer(serializers.Serializer):
    username = serializers.CharField()
    type = serializers.CharField()
    avi__avi_path = serializers.CharField()

class UserViewSerializer(serializers.Serializer):
    username = serializers.CharField()
    type = serializers.CharField()
    avi__avi_path = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    id = serializers.IntegerField()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = '__all__'

class RecommendationViewSerializer(serializers.Serializer):
    author = serializers.IntegerField()
    text = serializers.CharField()
    author__username = serializers.CharField()
    user_id = serializers.IntegerField()

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'
