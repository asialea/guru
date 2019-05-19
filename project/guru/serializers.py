from rest_framework import serializers
from .models import User, Work, Education, AboutUser, UserSkills, UserInterests
from django.contrib.auth import authenticate

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

    def update(self,instance,validated_data):
        user = User.objects.filter(pk=instance.id).update(username=validated_data['username'],
        first_name = validated_data['first_name'],last_name=validated_data['last_name'],
        password = validated_data['password'],email=validated_data['email'],)
        return user

class AboutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUser
        fields = '__all__'

    def update(self,instance,validated_data):
        about_user = AboutUser.objects.filter(user_id=instance.id).update(location=validated_data['location'],
        bio=validated_data['bio'],github=validated_data['github'],linkedin = validated_data['linkedin'],
        twitter_handle=validated_data['twitter_handle'],)
        return about_user

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

    def create(self,validated_data):
        work = Work.objects.create(user_id=validated_data['user_id'], start= validated_data['start'],end=validated_data['end'], company=validated_data['company'],
        location=validated_data['location'], position=validated_data['position'], description=validated_data['description'])
        return work


class UserSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkills
        fields = '__all__'

    def create(self,validated_data):
        skill = UserSkills.objects.create(user_id=validated_data['user_id'],skill=validated_data['skill'])
        return skill


class UserInterestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInterests
        fields = '__all__'

    def create(self,validated_data):
        interest = UserInterests.objects.create(user_id=validated_data['user_id'],interest=validated_data['interest'])
        return interest

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

    def create(self,validated_data):
        edu = Education.objects.create(user_id=validated_data['user_id'], start= validated_data['start'],end=validated_data['end'],
        school=validated_data['school'],location=validated_data['location'],degree=validated_data['degree'])
        return edu

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class TokenSerializer(serializers.Serializer):
    """
    This serializer serializes the token data
    """
    token = serializers.CharField(max_length=255)
