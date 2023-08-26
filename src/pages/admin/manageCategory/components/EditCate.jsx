import { useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as categoryApi from "../../../../service/api.category";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditCate({
  dataEdit,
  show,
  handleClose,
  getCategories,
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (dataEdit) {
      setValue("id", dataEdit.id);
      setValue("name", dataEdit.name);
      setValue("description", dataEdit.description);
    }
  }, [dataEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      await categoryApi.editCategory(data.id, data);
      handleClose();
      getCategories();
      toast.success("Category has been updated!");
    } catch (error) {
      toast.error("Somethings went wrong!", {
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="edit-cate-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>
              Name{" "}
              {errors.name && (
                <i
                  title={errors.name.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}
            </Form.Label>
            <Form.Control
              type="text"
              {...register("name", {
                required: "This field is required",
                maxLength: {
                  value: 100,
                  message: "This field must be no more than 100 characters",
                },
              })}
            />
            <br />
            <Form.Label>
              Description{" "}
              {errors.description && (
                <i
                  title={errors.description.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}{" "}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("description", {
                required: "This field is required",
                maxLength: {
                  value: 1000,
                  message: "This field must be no more than 1000 characters",
                },
              })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" form="edit-cate-form">
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
