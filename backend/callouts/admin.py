from django.contrib import admin

from .models import CalloutRequest


@admin.register(CalloutRequest)
class CalloutRequestAdmin(admin.ModelAdmin):
    """Jack's working list. Urgent jobs sort to the top of the day."""

    list_display = ("name", "phone", "appliance", "suburb", "is_urgent", "status", "created_at")
    list_filter = ("status", "is_urgent", "appliance", "created_at")
    list_editable = ("status",)
    search_fields = ("name", "phone", "suburb", "problem")
    date_hierarchy = "created_at"
    readonly_fields = ("name", "phone", "suburb", "appliance", "problem", "is_urgent", "created_at")

    fieldsets = (
        ("The job", {"fields": ("name", "phone", "suburb", "appliance", "is_urgent", "problem", "created_at")}),
        ("Where it stands", {"fields": ("status", "notes")}),
    )

    def has_add_permission(self, request):
        # These come from the website, never typed in here.
        return False
