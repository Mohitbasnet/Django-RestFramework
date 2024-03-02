from django.urls import path
from . views import ArticleList,ArticleDetails
urlpatterns = [
    path('articles/', ArticleList.as_view()),
    path('articles/<slug:slug>/',ArticleDetails.as_view() ),
]