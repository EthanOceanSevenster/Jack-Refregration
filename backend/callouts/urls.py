from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("callouts/", views.CalloutRequestCreateView.as_view(), name="callout-create"),
]
