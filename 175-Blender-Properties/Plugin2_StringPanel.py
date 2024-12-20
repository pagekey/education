import bpy


class PAGEKEY_PT_StringPanel(bpy.types.Panel):
    bl_idname = "PAGEKEY_PT_StringPanel"
    
    bl_category = "PageKey"
    bl_label = "StringPanel"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Enter a value to do something.")
        self.layout.prop(context.scene, "custom_text_field")
        self.layout.operator("mesh.primitive_cone_add", text="Add Cone")


bl_info = {
	"name": "PageKey String Panel",
    "blender": (2, 80, 0),
    "category": "Object",
}

def register():
	bpy.utils.register_class(PAGEKEY_PT_StringPanel)
	bpy.types.Scene.custom_text_field = bpy.props.StringProperty(
	    name="Custom Text",
	    description="A custom text field",
	    default=""
	)

def unregister():
	bpy.utils.unregister_class(PAGEKEY_PT_StringPanel)
	del bpy.types.Scene.custom_text_field

if __name__ == "__main__":
    register()
