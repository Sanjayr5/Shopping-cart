from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('rest-auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('register/', views.registerUser, name='register'),
    path('items/', views.getItems, name='items'),
    path('item/<str:pk>', views.getItem, name='item'),
    path('addorders/', views.addOrderItems, name='add_orders'),
]