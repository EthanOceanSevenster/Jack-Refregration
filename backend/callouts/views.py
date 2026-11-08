from django.http import JsonResponse
from rest_framework import generics
from rest_framework.throttling import AnonRateThrottle

from .notifications import notify_callout
from .serializers import CalloutRequestSerializer


class CalloutThrottle(AnonRateThrottle):
    scope = "callout"


def health(request):
    return JsonResponse({"status": "ok"})


class CalloutRequestCreateView(generics.CreateAPIView):
    """The one write this backend accepts.

    Saves first, tells Jack second. If the order were reversed, a mail problem
    would mean a lost job rather than a late email.
    """

    serializer_class = CalloutRequestSerializer
    throttle_classes = [CalloutThrottle]

    def perform_create(self, serializer):
        notify_callout(serializer.save())
