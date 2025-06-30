"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

interface StudentFormProps {
  studentId?: string;
  isEditing?: boolean;
  onSubmit?: (data: StudentFormData) => void;
  onCancel?: () => void;
}

export interface StudentFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  primaryContactNumber: string;
  secondaryContactNumber?: string;
  emailAddress?: string;
  studentEmail?: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  emergencyContactPerson: string;
  emergencyContactPhone: string;
}

const StudentForm = ({
  studentId,
  isEditing = false,
  onSubmit,
  onCancel,
}: StudentFormProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StudentFormData>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      primaryContactNumber: "",
      secondaryContactNumber: "",
      emailAddress: "",
      studentEmail: "",
      streetAddress: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "Philippines",
      emergencyContactPerson: "",
      emergencyContactPhone: "",
    },
  });

  // Mock function to simulate form submission
  const handleFormSubmit = (data: StudentFormData) => {
    console.log("Form submitted with data:", data);

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: isEditing
          ? "Student profile updated successfully!"
          : "Student registered successfully! Student ID: JIT-2023-0001",
      });

      if (onSubmit) {
        onSubmit(data);
      }
    }, 1000);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-background">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Student Profile" : "Register New Student"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the student's information in the form below."
              : "Fill in the student's information to register them in the system."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStatus.type && (
            <Alert
              className={`mb-6 ${formStatus.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
            >
              {formStatus.type === "success" ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 mr-2" />
              )}
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}

          {isEditing && studentId && (
            <div className="mb-6 p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">
                Student ID: <span className="font-bold">{studentId}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Information</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="required">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      placeholder="Enter first name"
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name (Optional)</Label>
                    <Input
                      id="middleName"
                      {...register("middleName")}
                      placeholder="Enter middle name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="required">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      placeholder="Enter last name"
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="required">
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                      })}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="required">
                      Gender
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("gender", value)}
                      defaultValue={watch("gender")}
                    >
                      <SelectTrigger
                        id="gender"
                        className={errors.gender ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button type="button" onClick={() => setActiveTab("contact")}>
                    Next: Contact Information
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactNumber" className="required">
                      Primary Contact Number
                    </Label>
                    <Input
                      id="primaryContactNumber"
                      {...register("primaryContactNumber", {
                        required: "Primary contact number is required",
                        pattern: {
                          value: /^[0-9+\-\s()]*$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      placeholder="e.g., +63 XXX XXX XXXX"
                      className={
                        errors.primaryContactNumber ? "border-red-500" : ""
                      }
                    />
                    {errors.primaryContactNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.primaryContactNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryContactNumber">
                      Secondary Contact Number (Optional)
                    </Label>
                    <Input
                      id="secondaryContactNumber"
                      {...register("secondaryContactNumber", {
                        pattern: {
                          value: /^[0-9+\-\s()]*$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      placeholder="e.g., +63 XXX XXX XXXX"
                      className={
                        errors.secondaryContactNumber ? "border-red-500" : ""
                      }
                    />
                    {errors.secondaryContactNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.secondaryContactNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailAddress">
                      Parent/Guardian Email (Optional)
                    </Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      {...register("emailAddress", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      placeholder="parent@example.com"
                      className={errors.emailAddress ? "border-red-500" : ""}
                    />
                    {errors.emailAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.emailAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentEmail">
                      Student Email (Optional)
                    </Label>
                    <Input
                      id="studentEmail"
                      type="email"
                      {...register("studentEmail", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      placeholder="student@example.com"
                      className={errors.studentEmail ? "border-red-500" : ""}
                    />
                    {errors.studentEmail && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.studentEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                <Separator className="my-4" />
                <h3 className="text-lg font-medium mb-4">Home Address</h3>

                <div className="space-y-2">
                  <Label htmlFor="streetAddress" className="required">
                    Street Address
                  </Label>
                  <Input
                    id="streetAddress"
                    {...register("streetAddress", {
                      required: "Street address is required",
                    })}
                    placeholder="Enter street address"
                    className={errors.streetAddress ? "border-red-500" : ""}
                  />
                  {errors.streetAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.streetAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="required">
                      City
                    </Label>
                    <Input
                      id="city"
                      {...register("city", { required: "City is required" })}
                      placeholder="Enter city"
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stateProvince" className="required">
                      State/Province
                    </Label>
                    <Input
                      id="stateProvince"
                      {...register("stateProvince", {
                        required: "State/Province is required",
                      })}
                      placeholder="Enter state or province"
                      className={errors.stateProvince ? "border-red-500" : ""}
                    />
                    {errors.stateProvince && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.stateProvince.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="required">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      {...register("postalCode", {
                        required: "Postal code is required",
                      })}
                      placeholder="Enter postal code"
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="required">
                      Country
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("country", value)}
                      defaultValue={watch("country")}
                    >
                      <SelectTrigger
                        id="country"
                        className={errors.country ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        {/* More countries would be added here */}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("personal")}
                  >
                    Previous: Personal Information
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("emergency")}
                  >
                    Next: Emergency Contact
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPerson" className="required">
                    Emergency Contact Person
                  </Label>
                  <Input
                    id="emergencyContactPerson"
                    {...register("emergencyContactPerson", {
                      required: "Emergency contact person is required",
                    })}
                    placeholder="Enter full name"
                    className={
                      errors.emergencyContactPerson ? "border-red-500" : ""
                    }
                  />
                  {errors.emergencyContactPerson && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.emergencyContactPerson.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone" className="required">
                    Emergency Contact Phone Number
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    {...register("emergencyContactPhone", {
                      required: "Emergency contact phone is required",
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    placeholder="e.g., +63 XXX XXX XXXX"
                    className={
                      errors.emergencyContactPhone ? "border-red-500" : ""
                    }
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.emergencyContactPhone.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("contact")}
                  >
                    Previous: Contact Information
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Student" : "Register Student"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">
            <span className="text-red-500">*</span> Required fields
          </p>
          <p className="text-sm text-muted-foreground">
            {isEditing ? "Last updated: June 10, 2023" : ""}
          </p>
        </CardFooter>
      </Card>

      <style jsx global>{`
        .required:after {
          content: " *";
          color: red;
        }
      `}</style>
    </div>
  );
};

export default StudentForm;
