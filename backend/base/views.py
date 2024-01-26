from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products import products  

@api_view(['GET'])
def getRoutes(request):
    return JsonResponse({'message': 'Hello'})

@api_view(['GET'])
def getProducts(request):
    return Response(products)


@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break

    return Response(product)