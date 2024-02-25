from django.db import models

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=200, unique = True)
    published = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.title