from django.contrib import admin
from django.urls import re_path,include
# from django.views.generic import TemplateView
urlpatterns = [
    re_path('admin/', admin.site.urls),
    
    re_path('',include('backend.urls')),
    # re_path('', TemplateView.as_view(template_name='index.html')),
    re_path('api-auth/', include('rest_framework.urls')), # this is for browsable api login/logout for this use django==3.1.14
    re_path('rest-auth/', include('rest_auth.urls')),
    re_path('rest-auth/registration/', include('rest_auth.registration.urls')),
    
]