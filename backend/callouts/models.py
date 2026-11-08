from django.db import models


class CalloutRequest(models.Model):
    """Somebody with a broken fridge, asking for help.

    Stored before anything is emailed. A mail failure must never lose a job,
    which is the whole reason this is a database row and not a mailto link.
    """

    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        BOOKED = "booked", "Booked"
        DONE = "done", "Done"
        CLOSED = "closed", "Closed, no job"

    class Appliance(models.TextChoices):
        # Ordered the way Jack described his work: aircon and heat pumps
        # first, refrigeration after. The form shows them in this order too.
        AIRCON = "aircon", "Air conditioner"
        HEAT_PUMP = "heat_pump", "Heat pump"
        COLD_ROOM = "cold_room", "Cold room"
        FREEZER_ROOM = "freezer_room", "Freezer room"
        FRIDGE = "fridge", "Fridge"
        FREEZER = "freezer", "Freezer"
        DISPLAY_FRIDGE = "display_fridge", "Display or shop fridge"
        OTHER = "other", "Something else"

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40, help_text="How Jack calls them back.")
    suburb = models.CharField(max_length=120, blank=True)
    appliance = models.CharField(
        max_length=20, choices=Appliance.choices, default=Appliance.AIRCON
    )
    problem = models.TextField(blank=True)
    # Urgency decides what gets phoned first thing in the morning.
    is_urgent = models.BooleanField(
        default=False, help_text="They said it is not cooling at all."
    )

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    notes = models.TextField(blank=True, help_text="Internal. Never shown to the customer.")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "callout request"

    def __str__(self) -> str:
        return f"{self.name} ({self.get_appliance_display()})"
