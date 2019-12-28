from django.db import models

# Create your models here.

class MainBuild(models.Model):
    computer_name = models.CharField(max_length=200)
    
    processor = models.ForeignKey('Processor', on_delete=models.CASCADE)
    ram_type = models.ForeignKey('RAMType', on_delete=models.CASCADE)

    def __str__(self):
        return self.computer_name

    def getPrice(self):
        return self.processor.processor_price + self.ram_type.ram_price

class Processor(models.Model):
    processor_name = models.CharField(max_length=200)
    processor_price = models.FloatField()

    def __str__(self):
        return self.processor_name

class RAMType(models.Model):
    ram_name = models.CharField(max_length=200)
    ram_price = models.FloatField()

    def __str__(self):
        return self.ram_name
