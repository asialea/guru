# Generated by Django 2.1.4 on 2019-05-22 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guru', '0022_avi_delete_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avi',
            name='delete_token',
            field=models.CharField(blank=True, default='', max_length=500),
        ),
    ]
