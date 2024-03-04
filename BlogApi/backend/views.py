from django.shortcuts import render,HttpResponse

# Create your views here.
from . models import Article
from .serializers import ArticleSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = "slug"

    
        

#GenericApi view lesson we can do below code in 2 line
# class ArticleList(generics.ListCreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
# class ArticleDetails(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     lookup_field = "slug"
# This is the view using mixinx
# class ArticleList(mixins.ListModelMixin,mixins.CreateModelMixin, generics.GenericAPIView):

#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     def get(self,request,*args,**kwargs):
#         return self.list(request,*args,**kwargs)
    
#     def post(self, request, *args,**kwargs):
#         return self.create(request,*args,**kwargs)
    

# class ArticleDetails(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):

#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     lookup_field = 'slug'

#     def get(self,request,slug,*args,**kwargs):
#         return self.retrieve(request,slug = slug)
    
#     def put(self,request,slug,*args,**kwags):
#         return self.update(request, slug = slug)
    
#     def delete(self,request,slug):
#         return self.destroy(request, slug = slug)



#This is class based api view
# class ArticleList(APIView):

#     def get(self, request):
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles,many=True)
#         return Response(serializer.data)
    
#     def post(self,request):
#         serializer = ArticleSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_402_BAD_REQUEST)


# class ArticleDetails(APIView):
#     def get_object(request,slug):
#         try:
#             return Article.objects.get(slug = slug)
#         except Article.DoesNotExist:
#             raise Http404

#     def get(self,request,slug):
#         article = self.get_object(slug)
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data)

#     def put(self,request,slug):
#         article = self.get_object(slug)
#         serializer = ArticleSerializer(article, data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_402_BAD_REQUEST)
#     def delete(self,request,slug):
#         article=self.get_object(slug)
#         article.delete()
#         return Response(status = status.HTTP_204_NO_CONTENT)
   
#This is function based api view
# @api_view(['GET','POST'])
# def article_list(request):
#     if request.method == "GET":
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles, many=True)
#         return Response(serializer.data)

#     elif request.method == "POST":
#         serializer = ArticleSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)

#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# @api_view(['GET','PUT','DELETE'])
# def article_detials(request,slug):

#     try:
#         article = Article.objects.get(slug=slug)

#     except Article.DoesNotExist():
#         return Response(status = status.HTTP_404_NOT_FOUND)
    

#     if request.method == "GET":
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data)
#     elif request.method == "PUT":
#         serializer = ArticleSerializer(article, data= request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == "DELETE":
#         article.delete()
#         return Response(status = status.HTTP_204_NO_CONTENT)


# @csrf_exempt
# def article_list(request):
#     if request.method == "GET":
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles,many = True)
#         return JsonResponse(serializer.data, safe = False)

#     elif request.method == "POST":
#         data = JSONParser().parse(request)
#         serializer = ArticleSerializer(data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status = 201)
#         return JsonResponse(serializer.errors, status = 400)


# @csrf_exempt
# def article_detials(request,slug):

#     try:
#         article = Article.objects.get(slug=slug)
#     except Article.DoesNotExist:
#         return HttpResponse(status = 404)
    

#     if request.method == "GET":
#         serializer = ArticleSerializer(article)
#         return JsonResponse(serializer.data)

#     elif request.method == "PUT":
#         data = JSONParser().parse(request)
#         serializer = ArticleSerializer(article, data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status = 200)
#         return JsonResponse(serializer.errors, staturs = 400)

    
#     elif request.method == "DELETE":
#         article.delete()
#         return HttpResponse(status=404)
