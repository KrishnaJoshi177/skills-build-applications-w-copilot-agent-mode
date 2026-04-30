from django.db import models

# User model
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    is_superhero = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# Team model
class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# Activity model
class Activity(models.Model):
    user_name = models.CharField(max_length=100, blank=True)
    user_email = models.EmailField(blank=True)
    activity_type = models.CharField(max_length=50)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    date = models.DateField()

    def __str__(self):
        return f"{self.user_name} - {self.activity_type}"

# Workout model
class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.CharField(max_length=50)

    def __str__(self):
        return self.name

# Leaderboard model
class Leaderboard(models.Model):
    user_name = models.CharField(max_length=100)
    user_email = models.EmailField(blank=True)
    points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user_name} - {self.points} pts"
