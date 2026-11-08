from rest_framework import serializers

from .models import CalloutRequest


class CalloutRequestSerializer(serializers.ModelSerializer):
    """What the website is allowed to send.

    `status` and `notes` are Jack's, so neither is writable here. A customer
    cannot mark their own job done or write themselves a note.
    """

    class Meta:
        model = CalloutRequest
        fields = ["id", "name", "phone", "suburb", "appliance", "problem", "is_urgent"]
        read_only_fields = ["id"]

    def validate_name(self, value: str) -> str:
        return " ".join(value.split())

    def validate_phone(self, value: str) -> str:
        digits = [c for c in value if c.isdigit()]
        if len(digits) < 9:
            raise serializers.ValidationError(
                "That does not look like a phone number. Jack needs to be able to call you back."
            )
        return " ".join(value.split())
