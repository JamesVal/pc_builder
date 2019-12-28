from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from .models import MainBuild, Processor, RAMType

def IndexView(request):
    return render(request, 'parts_manager/index.html')

def GetAllBuilds(request):
    data = [model_to_dict(eachItem) for eachItem in MainBuild.objects.all()]
    return JsonResponse(data, safe=False)

def GetBuildById(request, build_id):
    data = model_to_dict(MainBuild.objects.get(pk=build_id))
    return JsonResponse(data)

def GetProcessorById(request, processor_id):
    data = model_to_dict(Processor.objects.get(pk=processor_id))
    return JsonResponse(data)

def GetRAMById(request, ram_id):
    data = model_to_dict(RAMType.objects.get(pk=ram_id))
    return JsonResponse(data)
