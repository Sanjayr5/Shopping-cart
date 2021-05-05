from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Item, Order, OrderItem
from .serializers import ItemSerializer, UserSerializer, OrderItemSerializer, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

# Create your views here.
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    print(adapter_class)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'error_message': 'User already exists. Please Sign in'}
        return Response(message)

@api_view(['GET'])
def getUser(request):
    user = request.user
    serializer = UserSerializer(user, many = False)
    return Response(serializer.data)

@api_view(['GET'])
def getItems(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getItem(request, pk):
    item = Item.objects.get(_id = pk)
    serializer = ItemSerializer(item, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def addOrderItems(request):
    data = request.data
    order = Order.objects.create(
        email=data['email'],
        totalPrice=data['totalPrice']
    )
    orderItems = data['orderItems']
    for i in orderItems:
        item = Item.objects.get(_id=i['item'])
        item = OrderItem.objects.create(
            item=item,
            order=order,
            name=item.name,
            qty=i['qty'],
            price=i['price'],
            image=item.image.url,
        )
        item.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)