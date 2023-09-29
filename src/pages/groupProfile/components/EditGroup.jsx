import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as groupApi from "../../../service/api.group";
import { useEffect } from "react";

export default function EditGroup({ groupDetails, getGroupDetail }) {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (groupDetails) {
      setValue("id", groupDetails.id);
      setValue("name", groupDetails.name);
      setValue("biography", groupDetails.biography);
      setValue("isMangaGroup", groupDetails.isMangaGroup);
    }
  }, [groupDetails, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      await groupApi.putGroup(data.id, formData);
      toast.success("A group has been updated");
      getGroupDetail(data.id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="edit-group-page">
      <Form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>{" "}
          {errors.name && (
            <i
              title={errors.name.message}
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
          )}
          <Form.Control
            name="Name"
            control={control}
            rules={{ required: "This field is required" }}
            {...register("name", {
              required: "Group name is required",
            })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Biography</Form.Label>
          {errors.biography && (
            <i
              title={errors.biography.message}
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
          )}
          <Form.Control
            as="textarea"
            rows={3}
            {...register("biography", {
              required: "This field is required",
              maxLength: {
                value: 1000,
                message: "This field must be no more than 1000 characters",
              },
            })}
          />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-2 mb-3">
          <Form.Check
            name="IsMangaGroup"
            type="checkbox"
            label="Manga Group"
            control={control}
            rules={{ required: "This field is required" }}
            {...register("isMangaGroup")}
          />
          <i
            className="fa-regular fa-circle-question"
            title="Set this will allow your group uploaders to upload chapter under your group name"
          ></i>
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" form="edit-form" variant="success">
            Edit
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
}
