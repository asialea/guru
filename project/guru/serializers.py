from rest_framework import serializers
from .models import User, Work
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name','password','type','github','linkedin','twitter_handle')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],email=validated_data['email'],
        first_name = validated_data['first_name'],last_name=validated_data['last_name'],
        password = validated_data['password'],type=validated_data['type'],)
        return user

    def update(self,instance,validated_data):
        user = User.objects.filter(pk=instance.id).update(username=validated_data['username'],
        first_name = validated_data['first_name'],last_name=validated_data['last_name'],
         github = validated_data['github'], linkedin=validated_data['linkedin'],password = validated_data['password']
        ,email=validated_data['email'],twitter_handle=validated_data['twitter_handle'])
        return user

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

    def create(self,validated_data):
        work = Work.objects.create(user_id=validated_data['user_id'], start= validated_data['start'],end=validated_data['end'], company=validated_data['company'],
        location=validated_data['location'], position=validated_data['position'], description=validated_data['description'])
        return work


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
