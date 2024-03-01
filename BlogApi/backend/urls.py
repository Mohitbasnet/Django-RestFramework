from django.urls import path
from . views import article_list,article_detials

urlpatterns = [
    path('articles/', article_list),
    path('articles/<slug:slug>/', article_detials),
]