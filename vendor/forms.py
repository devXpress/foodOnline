from django import forms
from .models import Vendor
from accounts.validators import allowOnlyImages


class VendorForm(forms.ModelForm):
    vendor_license = forms.FileField(widget=forms.FileInput(attrs={'class':'btn btn-info'}), validators=[allowOnlyImages])
    class Meta:
        model = Vendor
        fields = ['vendor_name', 'vendor_license']