from django.urls import path
from . import views

app_name = 'parts_api'
urlpatterns = [
    path('', views.IndexView, name='index'),
    path('get_all_builds', views.GetAllBuilds, name='get_all_builds'),
    path('get_build_by_id/<int:build_id>', views.GetBuildById, name='get_build_by_id'),
    path('get_processor_by_id/<int:processor_id>', views.GetProcessorById, name='get_processor_by_id'),
    path('get_ram_by_id/<int:ram_id>', views.GetRAMById, name='get_ram_by_id')
]