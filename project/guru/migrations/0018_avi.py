# Generated by Django 2.1.4 on 2019-05-21 23:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('guru', '0017_auto_20190521_1749'),
    ]

    operations = [
        migrations.CreateModel(
            name='Avi',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avi_path', models.CharField(blank=True, default='', max_length=150)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, unique=True)),
            ],
        ),
    ]
